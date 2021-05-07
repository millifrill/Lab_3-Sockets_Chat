import { makeStyles } from "@material-ui/styles";

export default  function messageBubble () {
    const styled = useStyles();

    
    return (
       	<ol>
			<dt className={styled.messageBubble}>Hejsan</dt>
		</ol>
        
    )
}

const useStyles = makeStyles((theme) => ({
    messageBubble: {
            border: '1px solid #897AF2',
            borderRadius: '10px',
            backgroundColor: '#897AF2',
            height: '3em',
            width: '30%',
            padding: ' 5px',
        },
    
}))