import React from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';

export default function DialogDefault({ message, handler }) {
    const onHandler = () => {
        if (handler) {
            handler();
        }
    };
    return (
        <>
            <Dialog open={true} handler={onHandler} size="sm">
                <DialogHeader>Thông báo</DialogHeader>
                <DialogBody>{message}</DialogBody>
            </Dialog>
        </>
    );
}
