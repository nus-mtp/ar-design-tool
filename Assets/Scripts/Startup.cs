using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;
#endif

public class Startup : MonoBehaviour {
    void Start() {
        Debug.Log("up and running");
        MasterStateController.fixOrientation();
    }
}
