from pages.profile import ProfileManager
    
def test_login(browser):
    """
      Test Case: TC1577 - LogIn to Profile Manager without any error
      Steps:
            - Open playground
            - Enter Mnemonics
            - Wait for validating mnemonics
            - Click Login
      Result: Should login without any error, all users' data will be displayed (Mnemonics, Public SSH Key, Twin ID, Address)
    """
    profile_manager=ProfileManager(browser)
    profile_manager.add_mnemonics(
        "logic bag student thing good immune hood clip alley pigeon color wedding")
    profile_manager.login()
    profile_manager.close_profile()

def test_create_new_account(browser):
    """
      Test Case: TC1579 - Create a new account
      Steps:
            - Open playground
            - The Profile Manager should be visible.
            - Click on ' Don't have account? Create One'.
            - Add SSH Key.
            - Click on 'Update Public SSH Key'.
      Result: Account will be created successfully with new twin and ssh key.
    """

    profile_manager=ProfileManager(browser)
    profile_manager.create_new_account()
    profile_manager.add_ssh_key("ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCSJYyNo6j1LxrjDTRGkbBgIyD/puMprzoepKr2zwbNobCEMfAx9DXBFstueQ9wYgcwO0Pu7/95BNgtGhjoRsNDEz5MBO0Iyhcr9hGYfoXrG2Ufr8IYu3i5DWLRmDERzuArZ6/aUWIpCfpheHX+/jH/R9vvnjO2phCutpkWrjx34/33U3pL+RRycA1uTsISZTyrcMZIXfABI4xBMFLundaBk6F4YFZaCjkUOLYld4KDxJ+N6cYnJ5pa5/hLzZQedn6h7SpMvSCghxOdCxqdEwF0m9odfsrXeKRBxRfL+HWxqytNKp9CgfLvE9Knmfn5GWhXYS6/7dY7GNUGxWSje6L1h9DFwhJLjTpEwoboNzveBmlcyDwduewFZZY+q1C/gKmJial3+0n6zkx4daQsiHc29KM5wiH8mvqpm5Ew9vWNOqw85sO7BaE1W5jMkZOuqIEJiz+KW6UicUBbv2YJ8kjvNtMLM1BiE3/WjVXQ3cMf1x1mUH4bFVgW7F42nnkuc2k= alaa@alaa-Inspiron-5537")
    profile_manager.update_ssh_key()





# def test_validate_mnemonic(browser):
#     """

#     """
#     profile_manager = ProfileManager(browser)
#     profile_manager.add_mnemonics(
#         "logic bag student thing good immune hood clip alley pigeon color wedding")
#     profile_manager.activate_mnemonic()
#     sleep(20)
#     mnemonics = profile_manager.get_mnemonics()

# def test_logout(browser):
#     """

#     """

#     profile_manager=ProfileManager(browser)
#     profile_manager.add_mnemonics(
#         "logic bag student thing good immune hood clip alley pigeon color wedding")
#     profile_manager.activate_mnemonic()
#     profile_manager.logout()





"""
tests
--> validation on mnemonic and ssh key

--> test login with wrong mnemonic
--> add wrong ssh key
--> add wrong mnemonic
--> update ssh key
--> create new profile
"""
