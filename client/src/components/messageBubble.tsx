import { makeStyles } from "@material-ui/styles";

export default  function MessageBubble () {
    const styled = useStyles();

    
    return (
       	<ol>
			<dt className={styled.messageBubble}></dt>
		</ol>
        
    )
}

const useStyles = makeStyles((theme) => ({
    messageBubble: {
            border: '1px solid #897AF2',
            borderRadius: '0.6rem',
            backgroundColor: '#897AF2',
            height: '3rem',
            width: '30%',
            padding: '0.3rem',
            color: 'white',
        },
    
}))