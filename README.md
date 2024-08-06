# ReachInbox AI Email Automation Tool

## Introduction

This tool automates the process of parsing and responding to emails from Google and Outlook accounts. It uses AI to understand email context and responds accordingly, helping businesses manage their outbound marketing more efficiently.

## Features

- **OAuth Authentication** for Google and Outlook.
- **Email Parsing** and **Context Understanding** using GeminiAI.
- **Email Categorization** based on content.
- **Automated Response** generation and sending.
- **Task Scheduling** using BullMQ.

## Technologies Used

- **Node.js**
- **TypeScript**
- **BullMQ**
- **MySQL**
- **OAuth 2.0**
- **GeminiAI API**

## Usage

### OAuth Authentication

#### Google Authentication

- **Request:** "Google Auth"
- **Method:** GET
- **URL:** {{BASE_URL}}/auth/google

#### Outlook Authentication

- **Request:** "Outlook Auth"
- **Method:** GET
- **URL:** {{BASE_URL}}/auth/outlook/signin

### Gmail API Requests

#### Get Gmail Messages

- **Request:** "Get Gmail Messages"
- **Method:** GET
- **URL:** {{BASE_URL}}/api/getMail/:email
- **Headers:**
  - Authorization: Bearer {{GMAIL_TOKEN}}

Replace `:email` with the authenticated Gmail address.

#### Read Gmail Message

- **Request:** "Read Gmail Message"
- **Method:** GET
- **URL:** {{BASE_URL}}/api/read-mail/:email/message/:messageId
- **Headers:**
  - Authorization: Bearer {{GMAIL_TOKEN}}

Replace `:email` and `:messageId` with appropriate values.

#### Create Gmail Label

- **Request:** "Create Gmail Label"
- **Method:** POST
- **URL:** {{BASE_URL}}/api/createLabel/:email
- **Headers:**
  - Authorization: Bearer {{GMAIL_TOKEN}}
  - Content-Type: application/json
- **Body:**
  ```json
  {
    "name": "New Label",
    "messageListVisibility": "show",
    "labelListVisibility": "labelShow"
  }
  ```

Replace `:email` with the authenticated Gmail address.

#### Add Label to Gmail Message

- **Request:** "Add Label to Gmail Message"
- **Method:** POST
- **URL:** {{BASE_URL}}/api/addLabel/:email/messages/:messageId
- **Headers:**
  - Authorization: Bearer {{GMAIL_TOKEN}}
  - Content-Type: application/json
- **Body:**
  ```json
  {
    "addLabelIds": ["LABEL_ID"]
  }
  ```

Replace `:email`, `:messageId`, and `LABEL_ID` with appropriate values.

#### Send Gmail

- **Request:** "Send Gmail"
- **Method:** POST
- **URL:** {{BASE_URL}}/mail/send/:id
- **Headers:**
  - Authorization: Bearer {{GMAIL_TOKEN}}
  - Content-Type: application/json
- **Body:**
  ```json
  {
    "from": "sender@example.com",
    "to": "recipient@example.com",
    "subject": "Test Email",
    "text": "This is a test email sent from the API."
  }
  ```

Replace `:id` with an appropriate value.

### Outlook API Requests

#### List Outlook Mails

- **Request:** "List Outlook Mails"
- **Method:** GET
- **URL:** {{BASE_URL}}/mail/outlook/list/:email
- **Headers:**
  - Authorization: Bearer {{OUTLOOK_TOKEN}}

Replace `:email` with the authenticated Outlook email address.

#### Read Outlook Mail

- **Request:** "Read Outlook Mail"
- **Method:** GET
- **URL:** {{BASE_URL}}/mail/outlook/read/:email/:msgID
- **Headers:**
  - Authorization: Bearer {{OUTLOOK_TOKEN}}

Replace `:email` and `:msgID` with appropriate values.

#### Send Outlook Mail

- **Request:** "Send Outlook Mail"
- **Method:** POST
- **URL:** {{BASE_URL}}/mail/outlook/send/:id
- **Headers:**
  - Authorization: Bearer {{OUTLOOK_TOKEN}}
  - Content-Type: application/json
- **Body:**
  ```json
  {
    "from": "sender@outlook.com",
    "to": "recipient@example.com",
    "subject": "Test Outlook Email",
    "text": "This is a test email sent from the API via Outlook."
  }
  ```

Replace `:id` with an appropriate value.

## Demo Steps

1. **Connect New Email Accounts:**
   - Demonstrate the OAuth flow for both Google and Outlook.

2. **Send an Email to the Connected Accounts:**
   - Use another email account to send a test email.

3. **Read Incoming Emails:**
   - Showcase the tool reading the email and categorizing it.

4. **Categorize Email and Assign Labels:**
   - Demonstrate labeling the email as "Interested," "NotInterested," or "More information."

5. **Automated Response:**
   - Based on the email context, show the tool suggesting an appropriate response and sending it.

## Setup

### Prerequisites

- Node.js and npm installed
- Redis database setup
- Google API and Microsoft Azure accounts for OAuth
- GeminiAI API access
- BullMQ for task scheduling

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/sandeepguptax2003/REACHINBOX-ASSIGNMENT.git
   cd reachinbox-assignment

4. **Install Dependencies**
   ```bash
   npm install

3. **Environment Variables**
    ```bash
   Create a .env file in the root directory and add the following variables:
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   OUTLOOK_CLIENT_ID=your_outlook_client_id
   OUTLOOK_CLIENT_SECRET=your_outlook_client_secret
   GMAIL_TOKEN=your_gmail_token
   OUTLOOK_TOKEN=your_outlook_token
   OPENAI_API_KEY=your_geminiai_api_key

5. **Start the Server**
    ```bash
    nodemon server.js

## License

This project is licensed under the MIT License.

## Contact

For any questions or support, please contact [your-email@example.com].
