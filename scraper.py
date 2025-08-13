import requests
from bs4 import BeautifulSoup
import json

def scrape_udyam_form():
    """
    Scrapes the Udyam Registration form to extract fields for the first two steps.
    """
    url = "https://udyamregistration.gov.in/UdyamRegistration.aspx"
    form_schema = {
        "step1": {
            "title": "Aadhaar Verification",
            "fields": []
        },
        "step2": {
            "title": "PAN Verification",
            "fields": []
        }
    }

    try:
        print("Fetching the page...")
        response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')
        print("Page fetched successfully. Parsing form elements...")

        # --- Step 1: Aadhaar and Name Fields ---
        print("Scraping Step 1: Aadhaar Verification")
        aadhaar_section = soup.find('div', id='upPnlAadhaar')

        if aadhaar_section:
            # Aadhaar Number
            aadhaar_no_label = aadhaar_section.find('label', id='lblAadhaarNo')
            aadhaar_no_input = aadhaar_section.find('input', id='txtAadhaarNo')
            if aadhaar_no_label and aadhaar_no_input:
                form_schema["step1"]["fields"].append({
                    "id": aadhaar_no_input.get('id'),
                    "name": aadhaar_no_input.get('name'),
                    "label": aadhaar_no_label.text.strip().replace(' *', ''),
                    "type": "text",
                    "placeholder": "Enter 12 digit Aadhaar Number",
                    "required": True,
                    "validation": {
                        "regex": r"^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$",
                        "message": "Aadhaar should be a 12-digit number and not start with 0 or 1."
                    }
                })

            # Name as per Aadhaar
            name_label = aadhaar_section.find('label', id='lblName')
            name_input = aadhaar_section.find('input', id='txtNameAsPerAadhaar')
            if name_label and name_input:
                 form_schema["step1"]["fields"].append({
                    "id": name_input.get('id'),
                    "name": name_input.get('name'),
                    "label": name_label.text.strip().replace(' *', ''),
                    "type": "text",
                    "placeholder": "Enter Name as per Aadhaar",
                    "required": True,
                     "validation": {
                        "regex": r"^[a-zA-Z\s.]+$",
                        "message": "Name should only contain alphabets and spaces."
                    }
                })
        else:
            print("Could not find the Aadhaar section.")


        # --- Step 2: PAN Verification ---
        print("Scraping Step 2: PAN Verification")
        pan_section = soup.find('div', id='UpdatePanel5') # This seems to be the container for PAN details

        if pan_section:
            # Type of Organisation
            org_type_label = pan_section.find('label', id='lblOrgType')
            org_type_select = pan_section.find('select', id='ddlOrgType')
            if org_type_label and org_type_select:
                options = [opt.text.strip() for opt in org_type_select.find_all('option') if opt.get('value')]
                form_schema["step2"]["fields"].append({
                    "id": org_type_select.get('id'),
                    "name": org_type_select.get('name'),
                    "label": org_type_label.text.strip().replace(' *', ''),
                    "type": "select",
                    "options": options,
                    "required": True
                })

            # PAN Number
            pan_no_label = pan_section.find('label', id='lblPanNo')
            pan_no_input = pan_section.find('input', id='txtPanNo')
            if pan_no_label and pan_no_input:
                form_schema["step2"]["fields"].append({
                    "id": pan_no_input.get('id'),
                    "name": pan_no_input.get('name'),
                    "label": pan_no_label.text.strip().replace(' *', ''),
                    "type": "text",
                    "placeholder": "Enter PAN Number",
                    "required": True,
                    "validation": {
                        "regex": r"^[A-Z]{5}[0-9]{4}[A-Z]{1}$",
                        "message": "Invalid PAN format. It should be in the format ABCDE1234F."
                    }
                })
        else:
            print("Could not find the PAN section.")

        print("Scraping complete.")
        return form_schema

    except requests.exceptions.RequestException as e:
        print(f"An error occurred during the request: {e}")
        return None
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return None

if __name__ == "__main__":
    schema = scrape_udyam_form()
    if schema:
        with open('form_schema.json', 'w') as f:
            json.dump(schema, f, indent=4)
        print("\nSuccessfully created form_schema.json")
        print("\n--- JSON Schema ---")
        print(json.dumps(schema, indent=2))
