import { makeStyles } from "@material-ui/styles";

export default  function MessageBubble () {
    const styled = useStyles();

    
    return (

       	<div className={styled.messageBubble}>
			<dt className={styled.incomingMessage}></dt>
			<dt className={styled.sentMessage}></dt>
		</div>

        
        
    )
}

const useStyles = makeStyles((theme) => ({
    messageBubble: {
        marginTop: '1rem',
        display: 'flex',

    },
    
     incomingMessage: {
            border: '1px solid #E8E4FF',
            borderRadius: '0.6rem',
            backgroundColor: '#E8E4FF',
            height: '3rem',
            width: '30%',
            padding: '0.3rem',
            color: 'white',
            justifyContent: 'flex-start'
        },
    sentMessage: {
            border: '1px solid #897AF2',
            borderRadius: '0.6rem',
            backgroundColor: '#897AF2',
            height: '3rem',
            width: '30%',
            padding: '0.3rem',
            color: 'white',
            justifyContent: 'flex-end'
            
    }
    
}))