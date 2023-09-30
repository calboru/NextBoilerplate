import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  return (
    <Main meta={<Meta title="title" description="Description" />}>
      <h1>Hello World</h1>

      <button type="button" className="btn btn-primary">
        Button
      </button>
    </Main>
  );
};

export default Index;
