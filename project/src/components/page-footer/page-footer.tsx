import Logo from '../../components/logo/logo';

export default function PageFooter(): JSX.Element {
  return (
    <footer className="page-footer">
      <Logo additionalClass={'logo__link--light'} />

      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
}
