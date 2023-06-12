<h1 align="center">Welcome To Traverse 👋</h1>


# 🔗 Try it out here .
- [Production Server](https://traverse-rho.vercel.app/)


# 🏄🏼‍♀️ Plan your next trip with us  👇

![ss](https://cloud.appwrite.io/v1/storage/buckets/traverse/files/648315553b0f625ac6ea/view?project=64777ba0910c827a975b&mode=admin)

![ss](https://cloud.appwrite.io/v1/storage/buckets/traverse/files/648318cb74cb4a2bed6e/view?project=64777ba0910c827a975b&mode=admin)

![ss](https://cloud.appwrite.io/v1/storage/buckets/traverse/files/6483183c92a49a43d1c1/view?project=64777ba0910c827a975b&mode=admin)

![ss](https://cloud.appwrite.io/v1/storage/buckets/traverse/files/6483186a8586fdf637a5/view?project=64777ba0910c827a975b&mode=admin)

![ss](https://cloud.appwrite.io/v1/storage/buckets/traverse/files/648318838742fc9536d6/view?project=64777ba0910c827a975b&mode=admin)

![ss](https://cloud.appwrite.io/v1/storage/buckets/traverse/files/648318a55801f3fbace7/view?project=64777ba0910c827a975b&mode=admin)



# 👨🏼‍💻 Tech Stack

**Client:** React, Arco Design, MapBox GL

**Server**: Appwrite

**Other**: OpenAI

## Appwrite Services Used

- Auth
- Database
- Storage bucket
- Serverless cloud functions

# Run Locally

```
PS: Running in own appwrite server can be a hectic task for now. We will soon create an automation script that will do all the tasks for setting up own server. As of now, it is preferred to use our own appwrite server configurations. 
```

If you want to configure your own appwrite server , follow these steps. If you want to use our server but run client locally, just clone the repo and follow steps given below server configurations.

## Configure Appwrite Server

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

![Index](https://cloud.appwrite.io/v1/storage/buckets/traverse/files/648761cecc1217b2cef3/view?project=64777ba0910c827a975b&mode=admin)

#### Attributes and Indexes of ```favourites``` collection

![attributes](https://cloud.appwrite.io/v1/storage/buckets/traverse/files/6483139df2f63c36c5e9/view?project=64777ba0910c827a975b&mode=admin)

![Index](https://cloud.appwrite.io/v1/storage/buckets/traverse/files/648314195d1edf276470/view?project=64777ba0910c827a975b&mode=admin)

#### Attributes and Indexes of ```sharedTrips``` collection

![attributes](https://cloud.appwrite.io/v1/storage/buckets/traverse/files/648762493d58fcd78718/view?project=64777ba0910c827a975b&mode=admin)

-   Create bucket with name and id `traverse`

Clone the project
```bash
 git clone https://github.com/Traverse-A-Travel-Planner/traverse-client
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

## Deploy the cloud functions

- If you are running  your own server, deploy the cloud functions that are inside `functions` folder and setup necessary configurations like `.env` , `roles`, etc.

## Local URL
- Navigate to [http://localhost:3000](http://localhost:3000)

# Developers
- [Yaman Sarabariya](https://github.com/yaman1337)
- [Bibek Shah](https://github.com/bibekshhh)


# License

[MIT](https://github.com/Traverse-A-Travel-Planner/traverse-client/blob/main/LICENSE)

# Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.
