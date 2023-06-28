import { useContext } from 'react';
import { TabContext } from '../routes/test';
import { useCSVReader } from 'react-papaparse';

export default function CSVUploader() {
    const { CSVReader } = useCSVReader();
    const { tabContents, setTabContents } = useContext(TabContext)

    const addContent = (data) => {
        setTabContents({ ...tabContents, "newdata": data })
        console.log("content added");
    }
    console.log(tabContents);
    return (
        <CSVReader
            onUploadAccepted={(results) => {
                console.log('---------------------------');
                console.log(results);
                console.log('---------------------------');
            }}
        >
            {({
                getRootProps,
                acceptedFile,
                ProgressBar,
                getRemoveFileProps,
            }) => (
                <>
                    <div >
                        <button type='button' {...getRootProps()} >
                            Browse file
                        </button>
                        <div>
                            {acceptedFile && acceptedFile.name}
                        </div>
                        <button {...getRemoveFileProps()} >
                            Remove
                        </button>
                        <button onClick={() => addContent(acceptedFile)} >
                            Submit
                        </button>
                    </div>
                    <ProgressBar />
                </>
            )}
        </CSVReader>
    );
}