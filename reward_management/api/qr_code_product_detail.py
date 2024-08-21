from __future__ import unicode_literals
import frappe
from datetime import datetime


# get product qr table---------------
@frappe.whitelist()
def get_product_details_from_qr(decode_text):
    try:
        components = decode_text.strip().split('_')

        if len(components) < 3:
            return {"error": "Invalid QR code format"}

        product_qr_id = components[0]
        product_table_name = components[1]
        row_index = int(components[2])  # Convert row_index to integer

        product_qr = frappe.get_doc("Product QR", product_qr_id)

        if product_qr:
            matched_row = None
            for row in product_qr.qr_table:
                if row.product_table_name == product_table_name and row.idx == row_index:
                    matched_row = row
                    break
            
            if matched_row:
                if matched_row.scanned:
                    return {"error": "This QR code has already been scanned."}

                product_name = frappe.get_value("Product", {"name": matched_row.product_table_name}, "product_name")

                if not product_name:
                    return {"error": "Product not found for the given product_table_name"}

                return {
                    "product_name": product_name,
                    "product_table_name": matched_row.product_table_name,
                    "product_qr_id": matched_row.product_qr_id,
                    "points": matched_row.points,
                    "qr_code_image": matched_row.qr_code_image,
                    "scanned": matched_row.scanned
                }
            else:
                return {"error": "No matching product_table_name and row_index found in the Product QR document"}

        else:
            return {"error": "Product QR document not found"}

    except Exception as e:
        frappe.log_error(frappe.get_traceback(), f"Error in get_product_details_from_qr: {e}")
        return {"error": f"Server error: {e}"}
    
    
#Update Product QR table after scanned---------- 
@frappe.whitelist()
def update_scanned_status(product_table_name, product_qr_id, carpenter_id):
    try:
        # Fetch all Product QR documents
        product_qrs = frappe.get_all("Product QR", fields=["name"])

        if product_qrs:
            for product_qr in product_qrs:
                # Fetch child table data (qr_table) for each Product QR document
                qr_table_data = frappe.get_all("Product QR Table",
                                               filters={"parent": product_qr.name,
                                                        "product_table_name": product_table_name,
                                                        "product_qr_id": product_qr_id},
                                               fields=["name", "scanned", "carpenter_id", "redeem_date"])

                if qr_table_data:
                    # Assuming there's only one matching row, but you should handle multiple rows if needed
                    row = qr_table_data[0]
                    
                    # Found matching row in child table
                    if row.get('scanned'):
                        return {"error": "This QR code has already been scanned."}
                    
                    # Update scanned status, carpenter_id, and redeem_date
                    current_date = frappe.utils.nowdate()

                    # Update scanned status
                    frappe.db.set_value("Product QR Table", row['name'], "scanned", 1)
                    frappe.db.set_value("Product QR Table", row['name'], "carpenter_id", carpenter_id)
                    frappe.db.set_value("Product QR Table", row['name'], "redeem_date", current_date)
                    frappe.db.commit()

                    return {"message": "Scanned status and carpenter id updated successfully", "success": True}
                else:
                    # If no matching row found in qr_table for this particular Product QR document
                    continue

            # If no matching Product QR document found
            return {"error": "No matching product_table_name and product_qr_id found in any Product QR document"}

        else:
            # If no Product QR documents found
            return {"error": "No Product QR documents found"}

    except Exception as e:
        # Handle any exceptions and log errors
        frappe.log_error(frappe.get_traceback(), f"Error in update_scanned_status: {e}")
        return {"error": f"Server error: {e}"}



