import React from 'react'

const outer = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}
const mainDiv = {
    width: '20vw',
    height: '20vw',
    marginTop: '7vw'
}

const imgstyle = {
    height: '100%',
    width:'100%',
    borderRadius: '200px',
    boxShadow: '3px 3px lightblue, -1em 0 .4em violet'
}

function Loader() {
  return (
    <div style={outer}>
        <div style={mainDiv}>
            <img style = {imgstyle} src="https://irefglobal.com/wp-content/uploads/2021/08/pros-and-cons-of-being-real-estate-investor.gif" alt="" />
        </div>
    </div>
  )
}

export default Loader