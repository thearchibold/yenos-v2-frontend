
import {useState} from "react"
import Head from 'next/head'
// @ts-ignore
import styles from '../styles/Home.module.css'
import getGender from "./api/gender"

export default function Home() {

  const [loading, setLoading] = useState(false)
  let [gender, setGender] = useState(null)
  const  [name, setName] = useState("")


  const handleNameInputChange = (e) => {
    setName(e.target.value)
  }

  const makeGetGenderRequest = (e) => {
    e.preventDefault()
    if(name !== ""){
      setLoading(true)
      getGender(name).then(response => {
      
        const {error, predictions, gender} = response

      if(!error){
        setName("")
        console.log(response)
        setGender(response)
        console.log(error, predictions)
      }
            setLoading(false)

      })
      
    }
  }

  const Loader = () => {
    return (
      <div className={styles.ld_sellipsis}><div></div><div></div><div></div><div></div></div>
    )
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Yenos AI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          <div className={styles.header}>
              <div>
                Yenos - v2.0.0
              </div>

              <div>
                <a
          href="https://github.com/thearchibold"
          target="_blank"
          rel="noopener noreferrer"
        >
                <i className="bi bi-github"></i> {" "}
                <span className="ml-4">Github</span></a>
              </div>
          </div>
          <div className={styles.body_container + " container"}>

             <form  onSubmit={makeGetGenderRequest}>
               <h4>Predict gender with first name</h4>
                <div className="col form-group mt-4">
                  <input type="text" value={name} className="form-control w-10 mt-2" onChange={handleNameInputChange} aria-describedby="Enter name" placeholder="First name"/>
                  <small  className="form-text text-muted">e.g Archibold, Bernard etc.</small>
                </div>
              
                <button type="submit" disabled={name.length === 0} className="btn btn-primary mt-2 mb-3">Predict</button>

               
            </form>

            

            <div style={{height:"100px", display:"flex", alignItems:"flex-start"}}>
              {loading &&  <Loader/>}
              {
                gender && !loading &&  
                <div className={"container mt-2 card p-3"}>
                <div  className="row">
                 <div className={"col-sm"}>Name</div><div className={"col-sm"}> <b>{gender.name}</b></div>
                </div>
                <div  className="row mt-4">
                 <div className={"col-sm"}>Gender:</div><div className={"col-sm"}> <b>{gender.predictions.gender}</b></div>
                </div>
                <div  className="row mt-4">
                 <div className={"col-sm"}><div className={"col-sm"}>Female</div><div className={"col-sm"}> <b>{gender.predictions.confidence.FEMALE}</b></div></div>
                 <div className={"col-sm"}><div className={"col-sm"}>Male</div><div className={"col-sm"}> <b>{gender.predictions.confidence.MALE}</b></div></div>
                </div>
              </div>
              }
            </div>
            <div>
          
          
            </div>
            
             
          </div>


       
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
