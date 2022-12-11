import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faX,
  } from "@fortawesome/free-solid-svg-icons";

interface CloudIntegration {
    integration: IntegrationOption;
    setSelectedIntegrationOption: () => void;
    integrationOptionPress: () => void;
    deleteIntegrationAuth: () => void;
    authorizations: any;
}

interface IntegrationOption {
    name: string;
    type: string;
    clientId: string;
    docsLink: string;
}

const CloudIntegration = ({
    integration,
    setSelectedIntegrationOption,
    integrationOptionPress,
    deleteIntegrationAuth,
    authorizations
}: CloudIntegration) => {
    console.log('cio', integration);
    return (
        <div
        className={`relative ${
            ["Heroku"].includes(integration.name)
            ? "hover:bg-white/10 duration-200 cursor-pointer"
            : "opacity-50"
        } flex flex-row bg-white/5 h-32 rounded-md p-4 items-center`}
        onClick={() => {
            if (!["Heroku"].includes(integration.name)) return;
            setSelectedIntegrationOption(integration);
            integrationOptionPress({
            integrationOption: integration
            });
        }}
        key={integration.name}
        >
            <Image
            src={`/images/integrations/${integration.name}.png`}
            height={70}
            width={70}
            alt="integration logo"
            />
            {integration.name.split(" ").length > 2 ? (
            <div className="font-semibold text-gray-300 group-hover:text-gray-200 duration-200 text-3xl ml-4 max-w-xs">
                <div>{integration.name.split(" ")[0]}</div>
                <div className="text-base">
                {integration.name.split(" ")[1]}{" "}
                {integration.name.split(" ")[2]}
                </div>
            </div>
            ) : (
            <div className="font-semibold text-gray-300 group-hover:text-gray-200 duration-200 text-xl ml-4 max-w-xs">
                {integration.name}
            </div>
            )}
        {["Heroku"].includes(integration.name) &&
            authorizations
            .map((authorization) => authorization.integration)
            .includes(integration.name.toLowerCase()) && (
            <div className="absolute group z-50 top-0 right-0 flex flex-row">
                <div
                onClick={() => {
                    deleteIntegrationAuth({
                    integrationAuthId: authorizations
                        .filter(
                        (authorization) =>
                            authorization.integration ==
                            integration.name.toLowerCase()
                        )
                        .map((authorization) => authorization._id)[0],
                    });
                    router.reload();
                }}
                className="cursor-pointer w-max bg-red py-0.5 px-2 rounded-b-md text-xs flex flex-row items-center opacity-0 group-hover:opacity-100 duration-200"
                >
                <FontAwesomeIcon
                    icon={faX}
                    className="text-xs mr-2 py-px"
                />
                Revoke
                </div>
                <div className="w-max bg-primary py-0.5 px-2 rounded-bl-md rounded-tr-md text-xs flex flex-row items-center text-black opacity-90 group-hover:opacity-100 duration-200">
                <FontAwesomeIcon
                    icon={faCheck}
                    className="text-xs mr-2"
                />
                Authorized
                </div>
            </div>
            )}
        {!["Heroku"].includes(integration.name) && (
            <div className="absolute group z-50 top-0 right-0 flex flex-row">
            <div className="w-max bg-yellow py-0.5 px-2 rounded-bl-md rounded-tr-md text-xs flex flex-row items-center text-black opacity-90">
                Coming Soon
            </div>
            </div>
        )}
        </div>
    );
} 

export default CloudIntegration;