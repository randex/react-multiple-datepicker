import React from 'react'
import { Button, DialogActions } from '@mui/material'

// const Root = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-end;
//   margin: 0px;
//   max-height: 48px;
//   padding: 0px;
// `

// const Button = styled.button`
//   border: 10px;
//   box-sizing: border-box;
//   display: inline-block;
//   font-family: Roboto, sans-serif;
//   -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
//   cursor: pointer;
//   text-decoration: none;
//   margin: 4px 8px 8px 0px;
//   padding: 0px;
//   outline: none;
//   font-size: inherit;
//   font-weight: inherit;
//   position: relative;
//   z-index: 1;
//   height: 36px;
//   line-height: 36px;
//   min-width: 64px;
//   color: rgb(0, 188, 212);
//   transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
//   border-radius: 2px;
//   user-select: none;
//   overflow: hidden;
//   background-color: rgba(0, 0, 0, 0);
//   text-align: center;
//   max-height: 36px;
// `;

const CalendarActionButton = ({ cancelButtonText, submitButtonText, onCancel, onOk, readOnly }) => (
  <DialogActions>
    <Button onClick={onCancel}>{cancelButtonText}</Button>
    {!readOnly && (
      <Button color='primary' onClick={onOk}>
        {submitButtonText}
      </Button>
    )}
  </DialogActions>
)

export default CalendarActionButton
