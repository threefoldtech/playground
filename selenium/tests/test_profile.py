from pages.profile import ProfileManager


def test_login(browser):
    profile_manager = ProfileManager(browser)
    profile_manager.add_mnemonics(
        "logic bag student thing good immune hood clip alley pigeon color wedding")
    profile_manager.activate_mnemonic()
    mnemonics = profile_manager.get_mnemonics()
    assert mnemonics == "logic bag student thing good immune hood clip alley pigeon color wedding"


