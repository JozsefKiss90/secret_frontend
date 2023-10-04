import React, { useState } from "react"
import {useCreateSecrets} from "../logic/useCreateSecrets";
import SecretFormCreate from "../UI/SecretFormCreate";

export default function SecretFrom(){

  const {
    secret,
    warning,
    feedback,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useCreateSecrets(); 
     
    return (
        <div>
            <SecretFormCreate 
                secret={secret}
                warning={warning}
                feedback={feedback}
                isLoading={isLoading}
                handleInputChange={handleInputChange} 
                handleSubmit={handleSubmit}
            />
        </div>
    )
}