import React, { useState } from "react";
import SecretForm from "../UI/SecretFrom";
import SecretTable from "../UI/SecretTable";
import { useSecrets } from "../logic/useSecrets";
import Navbar from "../UI/Navbar";

export default function SecretRetrieve() {
    const {
        hash,
        secret,
        isXmlResponse,
        handleInputChange,
        handleToggleChange,
        handleSubmit,
      } = useSecrets();

      return (
        <div>
            <Navbar/>
            <SecretForm 
                hash={hash} 
                isXmlResponse={isXmlResponse} 
                handleInputChange={handleInputChange} 
                handleToggleChange={handleToggleChange} 
                handleSubmit={handleSubmit}
            />
            {secret && <SecretTable secret={secret} />}
        </div>
    )
}