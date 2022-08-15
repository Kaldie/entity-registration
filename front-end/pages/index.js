import { Space, Row, Col, Image } from "antd"
import entity from "../public/entity.jpg"
export default function Home() {
  return (
    <>
      <Row justify="space-evenly">
        <Col>
          <h1>Entity Generation</h1>
        </Col>
      </Row>

      <Row justify="space-evenly">
        <Image src="/entity.jpg" preview={false} alt="Random Image" />
      </Row>

    </>
  );
}