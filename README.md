# QF Coding Test

## 1. Getting started

### 1.1 Create a new private git repo

Login to your Github account and create a new **private** repo named `qantas-rm-technical-assessment`. Unzip our starting files into a new folder and from this folder run the following:
```
$ git init
$ git remote add origin git@github.com:REPLACE_WITH_YOUR_USERNAME/qantas-rm-technical-assessment.git
$ git add .
$ git commit -m "Adding Qantas RM technical assessment base files"
$ git push -u origin master
```

*❗️**Important**: Please keep this repo private.*
### 1.2 Start the code

1. Install dependencies `npm install`
2. Start the client `npm start`
3. Start the API `node server/index.js`

## TODO

Using MUI Components (https://mui.com/), build a UI that will provide the following:

- An autocomplete field that will allow searching for an airport based on the name
- An info panel that will show all available information for the selected airport
- Think about the happy path, but also about any special cases

*Hint:*

Use the 2 available functions found in the "services" folder. Currently the response type for both is of "any" type. Please add proper typing to them.

## 4. Submission

When you have completed your tasks, please add us as contributors to your private repo:

- `matgql`
- `ZheXuQF`
- `stuartswiftQF`

Now let your Qantas contact or recruiter know you have finished the assessment. They will communicate the next steps to you.

If you have any feedback on the assessment we'd love to hear your thoughts!

Thank you,

From the Qantas RM development team.
