```NodeJS Gmail API Integration```

nodejs-gmail-api-integration application integrates with the Gmail API to perform various operations on Gmail accounts. It is built using Node.js and provides a convenient way to interact with Gmail programmatically.

```Installation```

To install and set up the project, follow these steps:

Clone the repository to your local machine:


```git clone ```  https://github.com/kushalchauhan7629/nodejs-gmail-api-integration.git


``Change into the project directory:``


    cd nodejs-gmail-api-integration

Install the project dependencies using npm:

    npm install
```Configuration```

Before running the application, you need to set up the necessary credentials for accessing the Gmail API. Follow these steps to configure the project:

1. Go to the Google Cloud Console.

2. Create a new project or select an existing project.

3. Enable the Gmail API for your project:

- In the sidebar, click on "APIs & Services" and then "Library."
- Search for "Gmail API" and click on it.
- Click the "Enable" button.
4. Set up the OAuth 2.0 credentials:

- In the sidebar, click on "APIs & Services" and then "Credentials."
- Click on "Create credentials" and select "OAuth client ID."
- Choose "Web application" as the application type.
- Enter a name for your OAuth client ID.
- Add the authorized JavaScript origins and redirect URIs for your application (e.g., http://localhost:3000).
- Click on "Create" to generate the OAuth client ID and client secret.
5. Copy the client ID and client secret and create a new file called .env in the project root directory. Add the following lines to the .env file:

```bash
CLIENT_ID=<your-client-id>
CLIENT_SECRET=<your-client-secret>
REDIRECT_URL=<your-redirect-url>
```
`Replace <your-client-id>, <your-client-secret>, and <your-redirect-url> with your actual values.`

``To run the project, use the following command:``

```bash 
npm start
```
This command will start the Node.js application, and you can access it in your browser at http://localhost:8000.

Once the application is running, To send a reply email, you can use the following curl command:
```bash
curl --location --request POST 'http://localhost:8000/api/mail/send' \
--header 'Content-Type: application/json' \
--data-raw '{
    "text": "Your reply text here"
}'
```

Replace `"Your reply text here"` with the actual text you want to include in your email reply.
