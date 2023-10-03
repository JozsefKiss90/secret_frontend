import React, { useState } from "react";
import SecretFormRetrive from "../UI/SecretFromRetrieve";
import SecretTable from "../UI/SecretTable"; 
import { useRetrieveSecrets } from "../logic/useRetrieveSecrets";
import Navbar from "../UI/Navbar";

export default function SecretRetrieve() {
    const {
        hash,
        secret,
        warningMessage,
        isXmlResponse,
        isLoading,
        handleInputChange,
        handleToggleChange,
        handleSubmit,
      } = useRetrieveSecrets();
      //const secretExists= Object.keys(secret).length!==0 
      return (
        <div>
            <Navbar/> 
            <SecretFormRetrive 
                hash={hash} 
                warningMessage={warningMessage}
                isXmlResponse={isXmlResponse} 
                isLoading={isLoading}
                handleInputChange={handleInputChange} 
                handleToggleChange={handleToggleChange} 
                handleSubmit={handleSubmit}
            />
            {secret && <SecretTable secret={secret}/>}
        </div>
    )
}