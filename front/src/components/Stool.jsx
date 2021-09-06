import {TextField,MenuItem,makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        '&::before': {
        borderColor:'white'
        }
    }
}))


const STool = (props) => {

    
            let handleChange=(e)=>{
                let name=props.name
                
                let {value}=e.target
                props.setState((prevState)=>({
                    ...prevState,
                    [name]:value
                  }))
                 
            }


//className={style1.optionFA} className={style1.selectFA}

let listt
let list=props.list;
let list1=[];
let defaultValue;

props.value && (defaultValue=props.value)
list ? (
 listt = props.list.map(tool=>(
    <MenuItem  value={tool.id} key={tool.id}>{tool.name}</MenuItem>

))
):
(
    list = list1.map(tool=>(
    
    
        <option></option>
        
    ))
)

    return ( 
  
   <TextField  
                            select
                             variant="outlined"
                            label={props.label}
                            name="blood"
                            size="small"
                            // variant="filled"
                            color={props.color ? 'primary' : "secondary"}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        >

    {listt}
</TextField>
 
    );
}
 
export default STool;