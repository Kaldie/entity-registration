import Exploration from "../../components/Instance/Exploration";
import EntityService from "../../services/entity"

export default function exploration({ entities }) {
    return <>
        <Exploration entities={entities} />
    </>
}


export async function getServerSideProps({ res }) {
    res.setHeader(
        "Cache-Control",
        "public, s-maxage=10, stale-while-revalidate=59"
    )
    const entities = await new EntityService().get_all_entities_as_list()

    return {
        props: { entities },
    }
}