import { Card, CardBody, CardHeader, Chip, Spacer } from "@nextui-org/react";
import "../src/app/globals.css";

export default function Home() {
  return (
    <div className="flex flex-row flex-wrap content-start gap-3 justify-start items-start p-3 bg-gray-200 min-h-screen">
      <Card>
        <CardBody>
          <h2 className="text-gray-900 text-xl">
            This is a simple app to manage participants and their participation
          </h2>
        </CardBody>
      </Card>
      <Spacer y={5} />
      <Card>
        <CardBody>
          <h2 className="text-gray-900 text-xl">
            You can add, delete and see the participants
          </h2>
        </CardBody>
      </Card>
      <Spacer y={5} />
      <Card>
        <CardBody>
          <h2 className="text-xl text-gray-900">
            This NextJS app has PAGES structure, not App (Means Pages routing,
            not App routing)
          </h2>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <h2 className="text-xl text-gray-900">
              100% Tests coverage (except modules, they should be tested in E2E testing)
          </h2>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <h2 className="text-xl text-gray-900">
              Responsive tailwind design (try developers tools and different resolutions)
          </h2>
        </CardBody>
      </Card>
      <Spacer y={5} />
      <Card>
        <CardBody>
          <div className="flex flex-row flex-wrap justify-end items-end gap-3">
            <h2 className="text-2xl text-gray-900"> Stack is: </h2>
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
        </CardBody>
      </Card>
      <Spacer y={5} />
      <Card>
        <CardBody>
          <h2 className="text-2xl text-gray-900">
            There is 3 containers - PostgreSQL, BE and FE
          </h2>
        </CardBody>
      </Card>
      <Spacer y={5} />
      <Card>
        <CardBody>
          <h2 className="text-2xl text-gray-900">
            There is data validation for all API calls
          </h2>
        </CardBody>
      </Card>
      <Spacer y={5} />
      <Card>
        <CardHeader>How to scale this app</CardHeader>
        <CardBody>
          <div className="flex flex-row flex-wrap gap-3">
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
            </div>
            <div className="flex flex-col justify-start items-start gap-3">
              <Chip color="warning" variant="dot">
                Add a CI/CD pipeline to automate the deployment
              </Chip>
              <Chip color="warning" variant="dot">
                Add a monitoring tool to monitor the app
              </Chip>
              <Chip color="warning" variant="dot">
                Add a logging tool to log the data
              </Chip>
              <Chip color="warning" variant="dot">
                Add a security tool to secure the app
              </Chip>
            </div>
            <div className="flex flex-col flex-wrap justify-start items-start gap-3">
              <Chip color="warning" variant="dot">
                Add a testing tool to test the app
              </Chip>
              <Chip color="warning" variant="dot">
                Add a orchestration tool to manage the containers
              </Chip>
              <Chip color="warning" variant="dot">
                Add SEO tags in NextJS app
              </Chip>
              <Chip color="warning" variant="dot">
                Use microservices architecture
              </Chip>
            </div>
          </div>
        </CardBody>
      </Card>
      <Spacer y={5} />
    </div>
  );
}
