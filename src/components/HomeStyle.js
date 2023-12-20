import styled from 'styled-components';

export const PageContainer = styled.div`
position: relative;
display: flex;
flex-direction: column;
min-height: 100vh;
width: 100%;
align-items: center;
background-color: #DEEFE7;
`;

export const FishList = styled.div`
display: flex;
flex-direction: column;
width: 700px;
background: transparent;
border: 1px solid #042940;
align-items: space-between;
justify-content: center;
`;

export const FishItem = styled.div`
display: flex;
height: 45px;
padding: 0 15px;
align-items: center;
justify-content: center;
background-color: #B4BEC9;
color: #183B59;
&:nth-child(even) {
    background-color: #183B59;
    color: antiquewhite;
}`;

export const FishForm = styled(FishList)`
flex-direction: row;
margin: 50px 0;
padding-top: 0;
padding-left: 0;
justify-content: space-between;
align-items: center;
border: none;
`;

export const Input = styled.input`
margin-right: 12px;
height: 30px;
width: 250px;
padding-left: 10px;
border: 2px solid #183B59;
`;
export const InputB = styled.input`
margin-top: 10px;
margin-right: 12px;
height: 30px;
width: 250px;
padding-left: 10px;
border: 2px solid #183B59;
`;

export const Button = styled.button`
width: 140px;
height: 30px;
font-size: 90%;
color: antiquewhite;
background-color: #183B59;
cursor: pointer;
`;

export const Button2 = styled.button`
margin-top: 10px;
margin-right: 12px;
width: 250px;
height: 30px;
font-weight: bold;
color: antiquewhite;
cursor: pointer;
`;

export const Buttons = styled(FishForm)`
margin: 30px 0;
height: 40px;
cursor: pointer;
`;

export const TabButton = styled.button`
display: flex;
text-align: center;
align-items: center;
justify-content: center;
height: 100%;
width: 49%;
border: 1px solid white;
color: antiquewhite;
font-size: 20px;
cursor: pointer;
background-color: #183B59;
${(props) => {
    if (props.name === props['data-active']) {
      return `
        border: 2px solid #183B59;
       opacity: 0.5;
       border: 2px solid #183B59; 
        `;
    }
  }}
`;

export const AquariumForm = styled(FishForm)`
flex-direction: column;
`;

export const AquariumStatus = styled.h6`
padding: 0;
text-align: center;
height: 30px;
width: 250px;
`;