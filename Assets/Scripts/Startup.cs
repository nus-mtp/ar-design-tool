using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;
#endif

// [InitializeOnLoad]
public class Startup : MonoBehaviour {
    static Startup() {
        Debug.Log("up and running");
        MasterStateController.fixOrientation();
    }
}
