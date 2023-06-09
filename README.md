#  Welcome To Traverse 🥳


![ss](https://cloud.appwrite.io/v1/storage/buckets/traverse/files/648315553b0f625ac6ea/view?project=64777ba0910c827a975b&mode=admin)

![ss](https://cloud.appwrite.io/v1/storage/buckets/traverse/files/648318cb74cb4a2bed6e/view?project=64777ba0910c827a975b&mode=admin)

![ss](https://cloud.appwrite.io/v1/storage/buckets/traverse/files/6483183c92a49a43d1c1/view?project=64777ba0910c827a975b&mode=admin)

![ss](https://cloud.appwrite.io/v1/storage/buckets/traverse/files/6483186a8586fdf637a5/view?project=64777ba0910c827a975b&mode=admin)

![ss](https://cloud.appwrite.io/v1/storage/buckets/traverse/files/648318838742fc9536d6/view?project=64777ba0910c827a975b&mode=admin)

![ss](https://cloud.appwrite.io/v1/storage/buckets/traverse/files/648318a55801f3fbace7/view?project=64777ba0910c827a975b&mode=admin)



## Tech Stack

**Client:** React, Arco Design, MapBox GL

**Server:**: Appwrite

**Other**: OpenAI

## Appwrite Services Used

- Auth
- Database
- Storage bucket
- Serverless cloud functions

## Run Locally


Configure Appwrite Server

- Create appwrite account.
- Create database named traverse with custom databaseId traverse.
- Create the following collections:

| Collection Name  | Collection Id  |
| :------------: | :------------: |
| places  | places  |
|  reviews |  reviews |
|  favourites |  favourites |

#### Attributes and Indexes of ```places``` collection
![attributes](https://cloud.appwrite.io/v1/storage/buckets/traverse/files/648310128e00f797e03b/view?project=64777ba0910c827a975b&mode=admin)

![Index](https://cloud.appwrite.io/v1/storage/buckets/traverse/files/64831029ab33b9dfc739/view?project=64777ba0910c827a975b&mode=admin)

#### Attributes and Indexes of ```reviews``` collections

![attributes](https://cloud.appwrite.io/v1/storage/buckets/traverse/files/6483148c5055db459c70/view?project=64777ba0910c827a975b&mode=admin)

![Index](https://cloud.appwrite.io/v1/storage/buckets/traverse/files/648314bc30380a0721e0/view?project=64777ba0910c827a975b&mode=admin)

#### Attributes and Indexes of ```favourites``` collection

![attributes](https://cloud.appwrite.io/v1/storage/buckets/traverse/files/6483139df2f63c36c5e9/view?project=64777ba0910c827a975b&mode=admin)

![Index](https://cloud.appwrite.io/v1/storage/buckets/traverse/files/648314195d1edf276470/view?project=64777ba0910c827a975b&mode=admin)

-   Create bucket with name and id `traverse`

Clone the project
```bash
  https://github.com/Traverse-A-Travel-Planner/traverse-client
```

Go to the project directory

```bash
  cd traverse-client
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm  start
```

- Put the necessary configurations like project id and server endpoint in `src/Services/config.js`

Deploy the cloud function

- There is a serverless function in `serverless_function/postInsights`. Deploy it and set the necessary environment variable from your cloud function dashboard.

- Navigate to [http://localhost:3000](http://localhost:3000)
