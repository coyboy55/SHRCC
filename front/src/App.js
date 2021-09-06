import { withRouter } from "react-router-dom";
import SessionProvider from './components/session/SessionProvider';
import Routes from './components/Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './app.css'
import moment from 'moment';


function App(props) {
let appoint=[
  {
    timeS:moment('2020-02-02 21:00'),
    timeE:moment('2020-02-02 22:00')
  },
  {
    timeS:moment('2020-02-02 22:30'),
    timeE:moment('2020-02-02 23:00')
  }
]
// let a=moment('2020-02-02 18:00');
// console.log(a);
// console.log(a['_i']==appoint[0].timeS['_i']);
// let a=moment('2020-02-02 18:00');
// console.log(typeof(a['_i']));
// appoint.map(item=>{
//   if(a['_i']===item.timeS['_i'] || a['_i']===item.timeE['_i'] || item.timeS<a || a<item.timeE){
//     console.log('not available at '+a['_i']);
//   }else{  console.log('available at '+a['_i']);}

// })

  return (
   

      <SessionProvider>
           
        <Routes {...props}/>

        <ToastContainer />
      </SessionProvider>
    
  );
}

export default withRouter(App);
