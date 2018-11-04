import React from 'react';
const fs = window.require('fs');
import {Link} from 'react-router';

import {encrypt} from '../../utils/utils';
import {genkey} from '../../utils/keys';
const bitcoin = window.require('bitcoinjs-lib');
import {
    DEFAULT_WALLET_PATH,
    flashField,
    walletImportAlert,
} from '../../utils/wallet';
import packageJson from "../../../package";

export default class CreateWallet extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            walletExists: false,
            wrongPassword: false,
            wrongRepeatPassword: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.walletImportAlertsClose = this.walletImportAlertsClose.bind(this);
    }

    wrongPassword() {
        flashField(this, 'wrongPassword');
    }

    wrongRepeatPassword() {
        flashField(this, 'wrongRepeatPassword');
    }

    openWalletImportAlert(message, duration) {
        walletImportAlert(this, message, duration)
    }

    walletImportAlertsClose() {
        this.setState({
            walletImportAlerts: false,
            walletImportAlertsText: ''
        });
    }

    //here we create the wallet file in the default location after prompting for a password and creating the encrypted file.
    handleSubmit(e) {
        e.preventDefault();

        if (e.target.create_password.value.length > 0 && e.target.create_password.value === e.target.repeat_password.value) {
            const key_pair = genkey();

            const { address } = bitcoin.payments.p2pkh({ pubkey: key_pair.publicKey });

            const key_json = {};
            key_json['public_key'] = address;
            key_json['private_key'] = key_pair.toWIF();
            key_json['safex_bal'] = 0;
            key_json['btc_bal'] = 0;
            key_json['pending_safex_bal'] = 0;
            key_json['pending_btc_bal'] = 0;
            key_json['label'] = 'Enter your label here';

            const key_array = [];
            key_array.push(key_json);

            const json = {};

            json['version'] = '1';
            json['keys'] = key_array;

            console.log(json);

            const algorithm = 'aes-256-ctr';
            const password = e.target.create_password.value;
            const cipher_text = encrypt(JSON.stringify(json), algorithm, password);

            const walletPath = DEFAULT_WALLET_PATH;
            
            fs.writeFile(walletPath, cipher_text, (err) => {
                if (err) {
                    console.error(err);
                    this.openWalletImportAlert(`Failed to write wallet to ${walletPath}: ${err.message}`, 5000);
                } else {
                    localStorage.setItem('password', password);
                    localStorage.setItem('wallet', JSON.stringify(json));

                    localStorage.setItem('wallet_path', walletPath);
                    this.context.router.push('/wallet');
                }
            });
        } else if (e.target.create_password.value.length === 0) {
            this.wrongPassword();
            this.openWalletImportAlert(`Wrong password`, 5000);
        }

        if ((e.target.create_password.value.length > 0 && e.target.repeat_password.value.length === 0) || (e.target.repeat_password.value.length > 0 && e.target.repeat_password.value !== e.target.create_password.value)) {
            this.wrongRepeatPassword();
            this.openWalletImportAlert(`Wrong repeated password`, 5000);
        }
    }

    render() {
        return (
            <div className="container">
                <div className="col-xs-12 Login-logo">
                    <h2>Safex</h2>
                    <h3>Wallet</h3>
                    <p>{packageJson.version}</p>
                    <Link className="back-button" to="/"><img src="images/back.png" alt="Back img"/> Back</Link>
                </div>
                <div className="col-xs-12 Login-form Create-wallet-form">
                    <form className="form-group" onSubmit={this.handleSubmit}>
                        <input className={this.state.wrongPassword ? 'form-control shake' : 'form-control'} type="password" name="create_password" placeholder="Enter Password" autoFocus />
                        <input className={this.state.wrongRepeatPassword ? 'form-control shake' : 'form-control'} type="password" name="repeat_password" placeholder="Repeat Password" />
                        <button className="btn btn-default button-neon-blue" type="submit">CREATE </button>
                    </form>
                    <p className="text-center">
                        If you lose your password<br />
                        There is no recovery. <br />
                        Write it down, keep it safe. <br />
                    </p>
                </div>
                <div className="col-xs-12 text-center Intro-footer">
                    <img src="images/footer-logo.png" alt="Safex Icon Footer"/>
                    <p className="text-center">2014-2018 All Rights Reserved Safe Exchange Developers &copy;</p>
                </div>

                <div className={this.state.walletImportAlerts
                    ? 'overflow sendModal walletResetModal active'
                    : 'overflow sendModal walletResetModal'}>
                    <div className="container">
                        <h3>Create New Wallet
                            <span onClick={this.walletImportAlertsClose} className="close">X</span>
                        </h3>
                        <p>{this.state.walletImportAlertsText}</p>
                    </div>
                </div>
            </div>
        );
    }
}

CreateWallet.contextTypes = {
    router: React.PropTypes.object.isRequired
};
