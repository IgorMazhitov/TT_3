import { Chip, Spacer } from "@nextui-org/react";
import "../src/app/globals.css";

export default function Home() {
  return (
    <div className="flex flex-col justify-start items-start p-3 bg-slate-200 h-screen">
      <div className="flex flex-row justify-center items-end gap-3">
        <h2 className="text-slate-950">
          Please navigate to the Participants page
        </h2>
        <p className="text-slate-950">
          This is a simple app to manage participants and their participation
        </p>
      </div>
      <Spacer y={5} />
      <div className="flex flex-row justify-center items-end gap-3">
        <h2 className="text-2xl text-slate-950">
          I've added user removal - so everything changes accordingly
        </h2>
        <p className="text-slate-950">
          I've also added a pie chart to show the participation of the
          participants
        </p>
      </div>

      <Spacer y={5} />
      <h2 className="text-2xl text-slate-950">
        This NextJS app has PAGES structure, not App (Means Pages routing, not
        App routing)
      </h2>
      <Spacer y={5} />
      <div className="flex flex-row justify-end items-end gap-3">
        <h2 className="text-2xl text-slate-950"> Stack is: </h2>
        <Chip color="warning" variant="faded">
          NextJS
        </Chip>
        <Chip color="warning" variant="faded">
          TypeScript
        </Chip>
        <Chip color="warning" variant="faded">
          NextUI
        </Chip>
        <Chip color="warning" variant="faded">
          Axios
        </Chip>
        <Chip color="warning" variant="faded">
          PostgreSQL
        </Chip>
        <Chip color="warning" variant="faded">
          Docker
        </Chip>
        <Chip color="warning" variant="faded">
          NestJS
        </Chip>
        <Chip color="warning" variant="faded">
          TypeORM
        </Chip>
      </div>

      <Spacer y={5} />
      <h2 className="text-2xl text-slate-950">
        There is data validation for all API calls
      </h2>
      <Spacer y={5} />
      <h2 className="text-2xl text-slate-950">
        There is 3 containers - PostgreSQL, BE and FE
      </h2>
      <Spacer y={5} />
      <div className="flex flex-col justify-start items-start gap-3">
        <h2 className="text-2xl text-slate-950">How to scale this app: </h2>
        <div className="flex flex-row justify-start items-start gap-3">
          <div className="flex flex-col justify-start items-start gap-3">
            <Chip color="warning" variant="dot">
              Add a caching layer to cache the data
            </Chip>
            <Chip color="warning" variant="dot">
              Add a load balancer in front of the BE
            </Chip>
            <Chip color="warning" variant="dot">
              Add a message broker to handle the data
            </Chip>
            <Chip color="warning" variant="dot">
              Add a queue to handle the data
            </Chip>
            <Chip color="warning" variant="dot">
              Add a CI/CD pipeline to automate the deployment
            </Chip>
            <Chip color="warning" variant="dot">
              Add a monitoring tool to monitor the app
            </Chip>
          </div>
          <div className="flex flex-col justify-start items-start gap-3">
            <Chip color="warning" variant="dot">
              Add a logging tool to log the data
            </Chip>
            <Chip color="warning" variant="dot">
              Add a security tool to secure the app
            </Chip>
            <Chip color="warning" variant="dot">
              Add a testing tool to test the app
            </Chip>
            <Chip color="warning" variant="dot">
              Add a container orchestration tool to manage the containers
            </Chip>
            <Chip color="warning" variant="dot">
              Add a SEO tags in NextJS app
            </Chip>
          </div>
        </div>
      </div>

      <Spacer y={5} />
    </div>
  );
}