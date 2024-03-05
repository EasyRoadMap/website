import styles from "./style.module.css";
import Logo from "./components/Logo";

function App() {
  // Это не надо
  // const { products, loading, waring, addProduct } = useProduct();
  // const [modal_open, setModalOpen] = useState(false);
  // const createHendler = (product: IProduct) => {
  //   setModalOpen(false);
  //   addProduct(product);
  // };
  return (
    // Frame 1
    // <div className={styles.mainPage}>
    //   <Logo></Logo>
    //   <h1 className={styles.title}>Добро Пожаловать</h1>
    //   <form id="greeting">
    //     <input
    //       className={styles.input}
    //       placeholder="Введите адрес эл.почты"
    //     ></input>
    //   </form>
    //   <button type="submit" form="greeting" className={styles.button}>
    //     Продолжить
    //   </button>
    // </div>

    // Frame 2
    // <div className={styles.mainPage}>
    //   <Logo></Logo>
    //   <h1 className={styles.title}>Вход в аккаунт</h1>
    //   <form>
    //     <input
    //       className={styles.input}
    //       placeholder="Введите адрес эл.почты"
    //     ></input>
    //     <input className={styles.input} placeholder="Пароль"></input>
    //     <input
    //       type="checkbox"
    //       name="Запомни меня!"
    //       className="mr-2 ml-2"
    //     ></input>
    //     <label>Запомни меня!</label>
    //   </form>
    //   <button className={styles.button}>Войти</button>
    //   <button className={styles.button}>Забыли пароль?</button>
    // </div>

    // Frame 3
    <div className={styles.mainPage}>
      <Logo></Logo>
      <h1 className={styles.title1}>Восстановление доступа</h1>
      <h2 className={styles.discription}>
        Код восстановления был отправлен на <br />
        <strong className="text-black">
          <a href="mailto:llnnnlly@gmail.com">user.email@domain.ru</a>
        </strong>
        , введите его здесь:
      </h2>
      <form>
        <input className={styles.verification} maxLength="1"></input>
        <input className={styles.verification} maxLength="1"></input>
        <input className={styles.verification} maxLength="1"></input>
        <input className={styles.verification} maxLength="1"></input>
        <input className={styles.verification} maxLength="1"></input>
        <input className={styles.verification} maxLength="1"></input>
      </form>
      <button className={styles.button}>Войти</button>
      <h2 className={styles.discription}>
        Не получили письмо с кодом? <br />
        <strong className="text-black">
          <a className={styles.repeatLink} href="mailto:llnnnlly@gmail.com">
            Повторить отправку
          </a>
        </strong>
        &nbsp;(10 сек)
      </h2>
    </div>
  );
}

export default App;

// На это не смотри
// <>
//   <div className={styles.mainPage}>
//     <Header></Header>
//     <div className="container mx-auto max-w-2xl pt-5">
//       {loading && <Loader />}
//       {waring && <Waring waring={waring} />}
//       {products.map((product) => (
//         <Product key={product.id} product={product} />
//       ))}
//       {modal_open && (
//         <Modal title="Create Product" onClose={() => setModalOpen(false)}>
//           <CreateProduct onCreate={createHendler}></CreateProduct>
//         </Modal>
//       )}
//       <button
//         onClick={() => setModalOpen(true)}
//         className="fixed bottom-5 right-5 rounded-full bg-red-400
//     text-white text-2xl px-4 py-2"
//       >
//         +
//       </button>
//     </div>
//   </div>
// </>
