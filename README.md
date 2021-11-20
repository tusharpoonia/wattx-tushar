This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This is my first experience in developing a project using Next.js. I would have made a simple React app with [`create-react-app`](https://github.com/facebook/create-react-app) instead but there was a note in the documentation of the API that said:
"Making HTTP requests on the client side with Javascript is currently prohibited through CORS configuration. This is to protect your API Key which should not be visible to users of your application so your API Key is not stolen. Secure your API Key by routing calls through your own backend service."
So in order to save the efforts of creating an Express.js server with the React App, I went ahead with a Next.js App.

## Getting Started

I have built the project with the LTS version of Node.js as of now, i.e., 14.18.1
I assume it would work well with other Node.js versions as well, however please use the same version to avoid any issues as the project isn't tested on other versions of Node.js.

Install the dependencies and run the project.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Problem Statement

The project is a solution for the [WATTx Front-End Engineer Challenge: Top Coins (React)](https://github.com/WATTx/code-challenges/blob/master/frontend-engineer-challenge-top-coins-react.md)

## Project Structure

Besides the code structure provided in the bootstrap Next.js app, I have added four more folders, namely,
1. components: To add atomic React components
2. config: To keep configurational values. Only the configuration file for 'server' contains some values but configuration files for 'client' and 'common' are also added for completeness
3. context: To add a wrapper to use React's useContext for state management
4. utils: To add utility functions required for the client and server-side of the project. It also contains custom hooks.

## Solution

Since the /liquidity page required a bubble chart, I have used [react-google-charts](https://www.npmjs.com/package/react-google-charts). Here is the usage for Bubble Chart, https://react-google-charts.com/bubble-chart.

The solution worked fine for the 10 and 50 results. However, the page seemed sluggish when the option of All (5000) was selected because of so many DOM elements. To deal with this issue, I added pagination on the home page. The API is still fetching all the 5000 results at once but the list is growing by a factor of 50 as the user scrolls down. It improved the performance of the home page (Market overview) but the Liquidity analysis page couldn't be optimised for the chart must contain all the values at once. 

## Deployment

The solution is cuurently deployed on [Vercel](https://wattx-tushar.vercel.app/).