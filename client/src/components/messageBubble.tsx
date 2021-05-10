import { makeStyles } from "@material-ui/styles";


export default  function MessageBubble () {
    const styled = useStyles();  
    return (

       	<div className={styled.messageBubble}>
			<div className={styled.incomingMessage}></div>
			<div className={styled.sentMessage}></div>
		</div>     
        
    )
}

const useStyles = makeStyles((theme) => ({
    messageBubble: {
        width: '100%',
        display: 'flex',
        justifyContent:'space-between',
        // flexDirection: 'column',
    },
    
     incomingMessage: {
            border: '1px solid #E8E4FF',
            borderRadius: '0.6rem',
            backgroundColor: '#E8E4FF',
            height: '3.5rem',
            width: '30%',
            padding: '0.3rem',
            color: 'white',
            marginTop: '0.3rem',
            // display: 'flex',
            // justifyContent: 'flex-start'
        },
    sentMessage: {
            border: '1px solid #897AF2',
            borderRadius: '0.6rem',
            backgroundColor: '#897AF2',
            height: '3.5rem',
            width: '30%',
            padding: '0.3rem',
            color: 'white',
            marginTop: '1.5rem',
            // display: 'flex',
            // justifyContent: 'flex-end',
            
    }
    
}))