import React from "react";

export default class InstructionsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instructions_lang: "english"
    };
    this.changeInstructionLang = this.changeInstructionLang.bind(this);
  }

  changeInstructionLang(lang) {
    this.setState({
      instructions_lang: lang
    });
  }

  render() {
    return (
      <div>
        <div
          className={
            this.props.instructionsModal
              ? "instructionsModal active"
              : "instructionsModal"
          }
        >
          <div className="instructionsModalInner">
            <span className="close" onClick={this.props.closeInstructionsModal}>
              X
            </span>
            <div className="lang-bts-wrap">
              <button
                className={
                  this.state.instructions_lang === "english"
                    ? "button-shine active"
                    : "button-shine"
                }
                onClick={this.changeInstructionLang.bind(this, "english")}
              >
                EN
              </button>
              <button
                className={
                  this.state.instructions_lang === "serbian"
                    ? "button-shine active"
                    : "button-shine"
                }
                onClick={this.changeInstructionLang.bind(this, "serbian")}
              >
                SRB
              </button>
            </div>
            {this.state.instructions_lang === "english" ? (
              <div>
                <h3>Instructions</h3>
                <p>
                  To migrate your Safex Tokens to the Safex Blockchain, choose
                  one of the following options. If you don't already have your
                  Safex address, click{" "}
                  <button>
                    <img src="images/migration/cube.png" alt="Cube" />
                    new address
                  </button>{" "}
                  option. This will generate new Safex address.
                </p>
                <p className="red-text">
                  Before you proceed save the .txt file with your Safex Address
                  information. This information controls your coins, keep it
                  safe at all times! Sharing or losing this information can and
                  will cause the total loss of your Safex Tokens and Safex Cash.
                  Safex Team will not take responsibility for any losses that
                  may occur.
                </p>
                <p>
                  If you already have Safex Address, select{" "}
                  <button>
                    <img src="images/migration/enter-key.png" alt="Enter Key" />
                    my address
                  </button>{" "}
                  option. There you will need to enter your Safex Address, and
                  secret spend and secret view key for your address. Once you
                  set your address it will be saved, and you can always use it
                  later by choosing{" "}
                  <button className="my-keys">
                    <img src="images/migration/my-keys.png" alt="My Keys" />
                    previously used
                  </button>{" "}
                  option.
                </p>
                <p>
                  Next, you will need to set the first and the second half of
                  your Safex Address. These steps require bitcoin fee, so please
                  proceed with caution. If you make a mistake, you can always{" "}
                  <button className="red-btn">Reset</button> your transaction
                  and start over.
                </p>
                <p>
                  On the final step, choose the amount of Safex Tokens you want
                  to migrate. Once you enter your amount and click send the
                  migration transaction will begin. It may take a couple of days
                  to be processed, so please be patient. That is it, you have
                  successfully migrated your Safex Tokens to Safex Blockchain.
                </p>
              </div>
            ) : (
              <div>
                <h3>Uputstvo</h3>
                <p>
                  Da biste migrirali svoje Safex Tokene na Safex Blockchain,
                  izaberite jednu od ponudjenih opcija. Pro??itajte tekst i ako
                  se sla??ete kliknite procceed dugme. Ako nemate Safex adresu,
                  kliknite{" "}
                  <button>
                    <img src="images/migration/cube.png" alt="Cube" />
                    new address
                  </button>
                  dugme koje ??e generisati novu Safex adresu.
                </p>
                <p className="red-text">
                  Pre nego ??to nastavite sa??uvajte .txt fajl sa podacima o Va??oj
                  Safex adresi. Ovi podaci kontroli??u Va??e tokene, zato ih uvek
                  ??uvajte na sigurnom! U slu??aju kradje ili gubitka ovih
                  podataka izgubi??ete sve Va??e Safex tokene i Safex Cash. Safex
                  Team ne preuzima odgovornost za bilo kakve mogu??e gubitke
                  Va??ih tokena.
                </p>
                <p>
                  Ako ve?? imate Safex adresu, unesite je odabirom{" "}
                  <button>
                    <img src="images/migration/enter-key.png" alt="Enter Key" />
                    my address
                  </button>{" "}
                  opcije. Unesite svoju Safex adresu, i tajni klju?? za kupovinu
                  (secret spend key) i tajni klju?? za pregled (secret view key).
                  Kada unesete sve podatke, Va??a adresa ??e biti sa??uvana i uvek
                  mo??ete da joj pristupite{" "}
                  <button className="my-keys">
                    <img src="images/migration/my-keys.png" alt="My Keys" />
                    previously used
                  </button>{" "}
                  opcijom.
                </p>
                <p>
                  U slede??em koraku odredi??ete prvu i drugu polovinu Va??e Safex
                  adrese. To zahteva bitcoin naknadu, zato Vas molimo da budete
                  pa??ljivi. Ako napravite gre??ku, uvek mo??ete da resetujete
                  svoju transakciju i po??nete ispo??etka klikom na{" "}
                  <button className="red-btn">Reset</button> dugme.
                </p>
                <p>
                  Na poslednjem koraku izaberite iznos koji ??elite da migrirate.
                  Kada unesete iznos i kliknete send zapo??e??ete Va??u migracionu
                  transakciju. Obrada migracione transakcije mo??e da potraje par
                  dana, zato Vas molimo da budite strpljivi. To je to, uspe??no
                  ste zapo??eli migraciju Va??ih Safex tokena na Safex Blockchain.
                </p>
              </div>
            )}
          </div>
        </div>

        <div
          className={
            this.props.instructionsModal
              ? "instructionsModalBackdrop active"
              : "instructionsModalBackdrop"
          }
          onClick={this.props.closeInstructionsModal}
        />
      </div>
    );
  }
}
