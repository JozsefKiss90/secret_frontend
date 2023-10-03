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
        handleInputChange,
        handleToggleChange,
        handleSubmit,
      } = useRetrieveSecrets();

      return (
        <div>
            <Navbar/> 
            <SecretFormRetrive 
                hash={hash} 
                warningMessage={warningMessage}
                isXmlResponse={isXmlResponse} 
                handleInputChange={handleInputChange} 
                handleToggleChange={handleToggleChange} 
                handleSubmit={handleSubmit}
            />
            {secret && <SecretTable secret={secret}/>}
        </div>
    )
}