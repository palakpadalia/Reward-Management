import frappe
from frappe import _


    
@frappe.whitelist()
def get_notifications_log():
    # Get the current user
    user = frappe.session.user

    # Check if the user is "Administrator"
    if user == "Administrator":
        # Fetch only one user with the "Admin" role
        admin_user = frappe.get_all("User", filters={"role_profile_name": "Admin"}, pluck="name", limit=1)

        if admin_user:
            # Fetch notifications for that single Admin user
            notifications = frappe.get_all(
                "Notification Log",
                filters={"for_user": admin_user[0]},  # Select the first Admin user
                fields=["name", "subject", "email_content", "document_type", "for_user","creation"]
            )
        else:
            notifications = []
    else:
        # Fetch notifications for the logged-in user
        notifications = frappe.get_all(
            "Notification Log",
            filters={"for_user": user},
            fields=["name", "subject", "email_content", "document_type", "for_user"]
        )

    # Return the fetched data
    return notifications




@frappe.whitelist()
def send_system_notification(doc, method=None):
    # doc is the document that triggered the hook
    user_email = doc.name  # Assuming `doc.name` is the user email or ID

    # Fetch the username from the User doctype
    user = frappe.get_doc("User", user_email)
    username = user.username  # Access the username field

    # Create a new notification log entry
    notification = frappe.get_doc({
        'doctype': 'Notification Log',
        'for_user': user_email,
        'subject': 'Your Account Has Been Approved',
        'email_content': f'{username}, Your registration request has been approved, and your account has been created successfully.',
        'document_type': 'User',
        'name': 'Welcome Notification'
    })
    notification.insert(ignore_permissions=True)
    frappe.db.commit()

    return "Notification sent successfully"




@frappe.whitelist()
def send_customer_reward_approved_notification(doc, method=None):
    # Ensure the reward request status is 'Approved'
    if doc.request_status == 'Approved':
        # Fetch customer details using the customer_id field from Redeem Request
        try:
            # Use the customer_id field to fetch the Customer document
            customer = frappe.get_doc("Redeem Request", doc.name)
        except frappe.DoesNotExistError:
            frappe.throw(_("Customer {0} not found").format(doc.name))

        # Assuming the mobile_number is stored in customer.mobile_no
        # Generate the email format using mobile_number@gmail.com
        customer_email = f"{customer.mobile_number}@gmail.com"
        
        # Create a new notification log entry for the customer
        notification = frappe.get_doc({
            'doctype': 'Notification Log',
            'for_user': customer_email,  # Send notification to the specific customer
            'subject': 'Reward Request Approved',
            'email_content': f"""
                <p>{customer.full_name}, 
                <a href="../../rewards/redeem-request">Your request for 
                <strong>{doc.redeemed_points}</strong> points redemption has been approved!</a></p>
            """,
            'document_type': 'Redeem Request',
            'document_name': doc.name  # The name of the triggered document
        })
        notification.insert(ignore_permissions=True)
        frappe.db.commit()

        return "Notification Reward Request has been sent successfully"
    else:
        return "Request not approved, no notification sent"






 
