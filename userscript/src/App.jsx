import React, { useEffect } from "react";
import styled from "styled-components/macro";

const automatic = true;

function App() {
    const [isOpen, setIsOpen] = React.useState(false);

    useEffect(() => {
        (async () => {
            const host = window.location.host;
            if (host === "payroll.xero.com") {
                setIsOpen(true);
            }

            // AUTOMATED LOOP!
            if (!automatic) return;

            const path = window.location.pathname;
            if (path === "/PayRun/PayRun") {
                findUnfiled();
            }
            if (path.includes("/PayRun/PayRun/Details")) {
                clickFile();
            }
            if (path.includes("SingleTouch/Declaration/File")) {
                await new Promise(resolve => setTimeout(resolve, 3000));
                submitToAto();
            }
        })();
    }, []);

    const findUnfiled = async () => {
        const unfileds = Array.from(document.getElementsByClassName("x-tag-error"));

        //  increase page size
        document.getElementById('ext-gen1120').click();
        document.getElementsByClassName('x-boundlist-list-ct')[0].getElementsByTagName('li')[4].click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        const lastOne = unfileds[unfileds.length - 1];
        if (lastOne) {
            lastOne.click();
        } else {
            alert("No unfileds found!");
        }
    }

    const clickFile = async () => {
        document.getElementById("x-file").click();

        //  If it has already been filed, it won't navigate away. We can go back to the list page.
        await new Promise(resolve => setTimeout(resolve, 2000));
        window.location.href = 'https://payroll.xero.com/PayRun/PayRun';
    }

    const submitToAto = async () => {
        const checkbox = document.querySelectorAll('[data-automationid="qa-declaration-checkbox--label"]');
        const submit = document.querySelectorAll('[data-automationid="qa-declaration-submit"]');
        checkbox[0].click();
        await new Promise(resolve => setTimeout(resolve, 20));
        submit[0].click();
    }

    return (
        <Root>
            <Switch onClick={() => setIsOpen(!isOpen)}>
                Debug
            </Switch>
            {
                isOpen && (
                    <Bottom>
                        <div>
                            <a href="https://payroll.xero.com/PayRun/PayRun">PayRuns</a>
                            <button onClick={findUnfiled}>findUnfiled</button>
                            <button onClick={clickFile}>clickFile</button>
                            <button onClick={submitToAto}>submitToAto</button>
                        </div>
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
