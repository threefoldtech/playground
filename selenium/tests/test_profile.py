from pages.profile import ProfileManager

    
def test_login(browser):
    """
      Test Case: TC1577 - LogIn to Profile Manager without any error
      Steps:
            - Open playground
            - Enter Mnemonics
            - Wait for validating mnemonics
            - Click Activate
      Result: Should login without any error, all users' data will be displayed (Mnemonics, Public SSH Key, Twin ID, Address)
    """
    profile_manager=ProfileManager(browser)
    profile_manager.add_mnemonics(
        "logic bag student thing good immune hood clip alley pigeon color wedding")
    profile_manager.activate_mnemonic()
    profile_manager.close_profile()


# def test_validate_mnemonic(browser):
#     """

#     """
#     profile_manager = ProfileManager(browser)
#     profile_manager.add_mnemonics(
#         "logic bag student thing good immune hood clip alley pigeon color wedding")
#     profile_manager.activate_mnemonic()
#     sleep(20)
#     mnemonics = profile_manager.get_mnemonics()

def test_logout(browser):
    """

    """

    profile_manager=ProfileManager(browser)
    profile_manager.add_mnemonics(
        "logic bag student thing good immune hood clip alley pigeon color wedding")
    profile_manager.activate_mnemonic()
    profile_manager.logout()


def create_new_account(browser):
    """

    """
    profile_manager=ProfileManager(browser)
    profile_manager.create_new_account()
    sleep(10)
    

    # profile_manager.close_profile




"""
tests
--> validation on mnemonic and ssh key

--> test login with wrong mnemonic
--> add wrong ssh key
--> add wrong mnemonic
--> update ssh key
--> create new profile
"""
