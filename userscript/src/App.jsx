import React, { useEffect } from "react";
import styled from "styled-components/macro";
import Xero from './sites/Xero';

export const hosts = {
    xero: "payroll.xero.com"
}

function App() {
    const [isOpen, setIsOpen] = React.useState(false);
    const host = window.location.host;

    useEffect(() => {
        if (Object.values(hosts).includes(host)) {
            setIsOpen(true);
        }
    }, []);

    return (
        <Root>
            <Switch onClick={() => setIsOpen(!isOpen)}>
                Debug
            </Switch>
            {
                isOpen && (
                    <Bottom>
                        { host === hosts.xero && <Xero /> }
                    </Bottom>
                )
            }
        </Root>
    );
}

const Root = styled.div`
    background-color: #434343;
    z-index: 99999999;
    position: fixed;
    bottom: 0;
    left: 0;
    border-radius: 3px;

    button {
        cursor: pointer;
        background-color: #5d8cf1;
        border: none;
    }
`

const Switch = styled.button`
`

const Bottom = styled.div`
    width: 100vw;
    background-color: #fff;
    padding: 10px;
    font-size: 12px;
    font-family: monospace;
    color: #000;
    z-index: 9999;
    overflow: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
    word-break: break-all;
`;

export default App;
