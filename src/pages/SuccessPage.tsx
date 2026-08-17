import Hero from '../components/Hero';
import { SuccessCases } from '../components/SuccessCases';

export const SuccessPage = () => {
  return (
    <>
      <Hero
        title='cocks in vinegar'
        description='jooooooooooooooooooooooorl'
        buttonText='quesabealimon'
        heroType='form'
      />
      <SuccessCases
        title='Te mostramos el caso de exito de nuestra primera tienda online de '
        company='chicxsdelacalle'
        description='Te mostramos las estadisticas de la tienda online de chicxsdelacalle
          antes y después de montar su tienda online con pereiraweb. Desde sus
          ventas anuales en los diferentes años y su tráfico orgánico en
          google..'
        images={['/img/portfolio/mock-chicxs.png']}
        reverse
      />
      <SuccessCases
        title='Te mostramos el caso de exito de nuestra primera tienda online de'
        company=' carpersonido'
        description='Te mostramos las estadisticas de la tienda online de chicxsdelacalle
          antes y después de montar su tienda online con pereiraweb. Desde sus
          ventas anuales en los diferentes años y su tráfico orgánico en
          google..'
        images={['/img/portfolio/mock-carper.png']}
      />
    </>
  );
};
