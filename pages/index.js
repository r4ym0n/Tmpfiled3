import Head from 'next/head'
import Image from 'next/image'

import { useEffect,useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import downloadIcon from '../public/download-48.png'
import uploadIcon from '../public/file2-64.png'

import DwnBox from '../components/DwnBox'
import UpBox from '../components/UpBox'



export default function Home() {
  const [boxHeight, setboxHeight] = useState(0);
  useEffect(() => {
  },[])



  return (
    <div className="container">
      <Head>
        <title>Tmpfiled3</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">Tmpfiled3</a>
        </h1>

        <p className="description">
          Transfer your file with <b style={{color: 'blue'}}>Decenterlized Internet</b>
        </p>

        <div className="grid" style={{height: {boxHeight}}}>
          <UpBox/>
          <DwnBox/>


        </div>
        <ToastContainer />
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className="logo" />
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }


        .grid {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          flex-grow: 1;
          max-width: 800px;
          margin-top: 3rem;
        
        
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card-hover:hover,
        .card-hover:focus,
        .card-hover:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        


        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }
        .upload-box span {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        .upload-box {
          width: 92%;
          border: 3px dashed ;
        }
        .upload-icon-wp {
          display: block;
          text-align: center;
          margin-top: 5rem;
          transition: all 0.6s;
        }
        .upload-icon {
          // width: 40%;
          display: inline-block;
          // height: 100px;
          text-align: center;
          // border: 3px solid #ccc;
          border-radius: 5%;
        }

        .upload-icon-wp:hover,
        .upload-icon-wp:focus,
        .upload-icon-wp:active {
          color: #0070f3;
          border-color: #0070f3;
          color: #0070f3;
          transform: scale(1.2);

        }

        .upload-footer {
          margin-top: 100px;
        }

        .btn {
          font-size: 1em;
          border-radius: 5px;
        }
        
        .btn-primary {
          color: #5189ff;
          optical: 0.4; 
        }
        .btn-download {
          background-image: url(/download-48.png);
          background-size: contain;
          background-repeat: no-repeat;
          height: 35px;
          width: 45px;
          background-position: center center;
          vertical-align:middle;
          border-radius: 0px 5px 5px 0px;
          margin-left: -2px;
        }
        .input-code {
          height: 35px;
          vertical-align:middle;
          border-radius: 5px 0px 0px 5px;
          font-size: x-large;
          width: 10rem
        }
        .code-box {
          width: 100%;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
