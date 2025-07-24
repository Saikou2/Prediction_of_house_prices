# tests/test_example.py

def test_example_function():
    # Un test simple qui passe toujours
    assert True

# Si vous voulez tester une fonction de votre API ou de src/
# Vous devrez peut-être ajuster PYTHONPATH ou les imports pour que cela fonctionne
# Exemple:
# from src.data_preparation import load_data
# def test_load_data_returns_data():
#    X_train, y_train, X_test, y_test = load_data()
#    assert X_train is not None
#    assert X_test is not None
#    assert not X_train.empty