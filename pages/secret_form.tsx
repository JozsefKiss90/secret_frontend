import React, { useState } from "react"
import {useCreateSecrets} from "../logic/useCreateSecrets";
import SecretFormCreate from "../UI/SecretFormCreate";

export default function SecretFrom(){

  const {
    secret,
    warning,
    handleInputChange,
    handleSubmit,
  } = useCreateSecrets();
     
    return (
        <div>
            <SecretFormCreate 
                secret={secret}
                warning={warning}
                handleInputChange={handleInputChange} 
                handleSubmit={handleSubmit}
            />
        </div>
    )
}