import { useEffect } from "react";

const automatic = false;

const Xero = () => {

    useEffect(() => {
        (async () => {
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

    return <div>
        <a href="https://payroll.xero.com/PayRun/PayRun">PayRuns</a>
        <button onClick={findUnfiled}>findUnfiled</button>
        <button onClick={clickFile}>clickFile</button>
        <button onClick={submitToAto}>submitToAto</button>
    </div>
}

export default Xero;
