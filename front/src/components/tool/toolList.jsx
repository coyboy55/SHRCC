
import Tool from './tool';
import { Transition, animated } from 'react-spring';
import style1 from '../../App.module.css'


 const ToolList = (props) => {
  
        let { tools, updateTool, deleteTool } = props;
        return (
          
            <Transition
            items={tools}
            keys={tool => tool.id}
            from={{ transform: "translate3d(-100px,0,0)" }}
            enter={{ transform: "translate3d(0,0px,0)" }}
            leave={{ transform: "translate3d(-100px,0,0)" }}
        >
            {(style, tool) => (
                <animated.div className={style1.ListFA} style={style}>
                    <Tool
                        key={tool.id}
                        id={tool.id}
                        name={tool.name}
                       updateTool={updateTool}
                       deleteTool={deleteTool}

                    />
                </animated.div>
            )}
        </Transition>
     
        )
    
}

export default ToolList