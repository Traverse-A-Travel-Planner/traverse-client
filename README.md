<h1 align="center">Welcome To Traverse 👋</h1>


# 🔗 Try it out here .
- [Production Server](https://traverse-rho.vercel.app/)


# 🏄🏼‍♀️ Plan your next trip with us  👇

![ss](https://cloud.appwrite.io/v1/storage/buckets/traverse/files/64886964db762814b8d9/view?project=64777ba0910c827a975b&mode=admin)

![ss](https://cloud.appwrite.io/v1/storage/buckets/traverse/files/6488699cb9e902af6cad/view?project=64777ba0910c827a975b&mode=admin)

![ss](https://cloud.appwrite.io/v1/storage/buckets/traverse/files/648869cc5a0b0b57e246/view?project=64777ba0910c827a975b&mode=admin)

![ss](https://cloud.appwrite.io/v1/storage/buckets/traverse/files/64886a04054692f07894/view?project=64777ba0910c827a975b&mode=admin)

![ss](https://cloud.appwrite.io/v1/storage/buckets/traverse/files/64886a7c0ea18f04e99d/view?project=64777ba0910c827a975b&mode=admin)

![ss](https://cloud.appwrite.io/v1/storage/buckets/traverse/files/64886aa8409162ea0291/view?project=64777ba0910c827a975b&mode=admin)

![ss](https://cloud.appwrite.io/v1/storage/buckets/traverse/files/64886ad8bf660e660bd3/view?project=64777ba0910c827a975b&mode=admin)

![ss](https://cloud.appwrite.io/v1/storage/buckets/traverse/files/64886b2581b1198c144a/view?project=64777ba0910c827a975b&mode=admin)

![ss](https://cloud.appwrite.io/v1/storage/buckets/traverse/files/6488df718818c566d87f/view?project=64777ba0910c827a975b&mode=admin)

![ss](https://cloud.appwrite.io/v1/storage/buckets/traverse/files/64886b79b65f3ebb54fe/view?project=64777ba0910c827a975b&mode=admin)




# 👨🏼‍💻 Tech Stack

**Client:** React, Arco Design, MapBox GL

**Server**: Appwrite

**Other**: OpenAI, Chart.Js

## Appwrite Services Used

- Auth
- Database
- Storage bucket
- Serverless cloud functions

# Run Locally

Clone the project
```bash
 git clone https://github.com/Traverse-A-Travel-Planner/traverse-client
```

Go to the project directory

```bash
  cd traverse-client
```

If you want to configure your own server for `traverse` follow these steps. To use our own server configurtion [skip](https://github.com/Traverse-A-Travel-Planner/traverse-client/edit/main/README.md#run-the-client-application) this section.

## Configure Your Own Appwrite Server

- Create appwrite account.
- Get your API keys from dashboard.
- Now, open folder `auto-setup`.
- Create a `.env` file in this folder. See `.env.example` for reference.
- Put the Appwrite api key, endpoint and project id in `.env` file.
- Now, open terminal in root of `traverse-client` project.
- Run: `npm run setup-server`. This will setup all the resources for `traverse` in your freshly made project.
- Login to Appwrite with appwrite-cli.
- Run: `appwrite deploy function --all` . This will deploy the serverless functions in the appwrite cloud.

### An overview to our database architecture: 

| Collection Name  | Collection Id  |
| :------------: | :------------: |
| places  | places  |
|  reviews |  reviews |
|  favourites |  favourites |
|  sharedTrips |  sharedTrips |


#### Attributes and Indexes of ```places``` collection
![attributes](https://cloud.appwrite.io/v1/storage/buckets/traverse/files/648310128e00f797e03b/view?project=64777ba0910c827a975b&mode=admin)

![Index](https://cloud.appwrite.io/v1/storage/buckets/traverse/files/64831029ab33b9dfc739/view?project=64777ba0910c827a975b&mode=admin)

#### Attributes and Indexes of ```reviews``` collections

![attributes](https://cloud.appwrite.io/v1/storage/buckets/traverse/files/6483148c5055db459c70/view?project=64777ba0910c827a975b&mode=admin)

![Index](https://cloud.appwrite.io/v1/storage/buckets/traverse/files/64886c5de46ffa5adef4/view?project=64777ba0910c827a975b&mode=admin)

#### Attributes and Indexes of ```favourites``` collection

![attributes](https://cloud.appwrite.io/v1/storage/buckets/traverse/files/6483139df2f63c36c5e9/view?project=64777ba0910c827a975b&mode=admin)

![Index](https://cloud.appwrite.io/v1/storage/buckets/traverse/files/648314195d1edf276470/view?project=64777ba0910c827a975b&mode=admin)

#### Attributes and Indexes of ```sharedTrips``` collection

![attributes](https://cloud.appwrite.io/v1/storage/buckets/traverse/files/648762493d58fcd78718/view?project=64777ba0910c827a975b&mode=admin)

- Above steps were for configuring `traverse` in your own server. 

## Run the client application

- Put the necessary configurations like project id and server endpoint in `src/Services/config.js` if you are using your own server. If you are using our server configuration, leave it as it is. 

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm  start
```

## Local URL
- Navigate to [http://localhost:3000](http://localhost:3000)

# Authors
- [Yaman Sarabariya](https://github.com/yaman1337)
- [Bibek Shah](https://github.com/bibekshhh)
- [Sandip Khadka](https://www.instagram.com/sandip61_)


# License

[MIT](https://github.com/Traverse-A-Travel-Planner/traverse-client/blob/main/LICENSE)

# Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.
