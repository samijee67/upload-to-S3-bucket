import React from "react";
import styled from "styled-components";
import Button from "../../components/forms/button.component";
import Text from "../../components/style/text.component";
import colors from "../../themes/colors.theme";
import { uploadFile } from "../../utils/s3.utils";

const Container = styled.div`
    background-color: ${colors.dark};
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Content = styled.div`
    width: 500px;
`

const ExampleScreen = () => {
    const [s3Path, setS3Path] = React.useState(null);
    const [file, setFile] = React.useState(null);
    const [preview, setPreview] = React.useState(null);
    const fileInput = React.useRef(null);

    const onChange = async (e) => {
        var file = e.target.files[0];
        setPreview(URL.createObjectURL(file));
        setFile(file);
    }

    const uploadToS3 = async () => {
        if (file) {
            const filePath = await uploadFile(file);
            setS3Path(filePath);
        }
    }

    const getFile = () => {
        fileInput.current.click();
    }

    return <Container>
        <Content>
            <Text h2 style={{ marginBottom: 20 }}>
                S3 upload
            </Text>
            <input ref={fileInput} style={{ display: "none" }} type="file" id="myFile" name="filename" onChange={onChange} />
            <div style={{ maxWidth: 200 }} >
                <Button text="Get file" onClick={getFile} style={{ marginBottom: 10 }} />
                {preview &&
                    <img style={{ borderRadius: 22, marginBottom: 10 }} src={preview} width="195" />
                }
                <Button text="Upload to s3" onClick={uploadToS3} />
            </div>
            <Text style={{ marginBottom: 20 }}>
                S3 path : {s3Path}
            </Text>
        </Content>
    </Container>
}

export default ExampleScreen;