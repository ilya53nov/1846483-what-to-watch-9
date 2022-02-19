import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function NotFoundScreen(): JSX.Element {
  return(
    <div style={{textAlign: 'center', marginTop: '5%'}}>

      <section>
        <div>
          <div>
            <img style={{filter: 'invert(1)'}} src="https://assets.htmlacademy.ru/img/icons/404.v3.svg" alt="404" width="750" height="428" />
          </div>

          <div>
            <h1>Страница не найдена</h1>

            <p>Возможно она была, но исчезла из-за катастрофически быстрого сжатия под воздействием гравитационных сил. Но это ещё не точно.</p>

            <div style={{marginTop: '50px', width: '100%', height: '60px', backgroundColor: '#d5d9a9', display: 'flex'}}>
              <Link style={{margin: 'auto', textDecoration: 'none', fontSize: '30px', color: 'black', fontWeight: '700'}}  to={AppRoute.Main}>Перейти на главную</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
