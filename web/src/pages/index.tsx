import React, { useState, useEffect } from 'react';
import styles from './index.less';
import request from 'umi-request';

function getData(callback) {
    request
        .get('/content')
        .then(function (response) {
            console.log(response);
            callback(response.content)
        })
        .catch(function (error) {
            console.log(error);
        });
}

function writeData(content) {
    request
        .post('/content', {
            data: {
                content,
          }
        })
        .then(function (response) {
            console.log(response);
            alert("ok");
        })
        .catch(function (error) {
            console.log(error);
        });
}

export default function IndexPage() {
    const [content, setContent] = useState('');

    const onSaveClicked = () => {
        writeData(content);
    }

    const onTextChanged = (event) => {
        setContent(event.target.value);
    }

    useEffect(() => {
        getData((value) => {
            setContent(value);
        });
    }, []);

    return (
        <div className={styles.container}>
            <textarea className={styles.input} onChange={onTextChanged} value={content} />
            <button onClick={onSaveClicked}>Save</button>
        </div>
    );
}
